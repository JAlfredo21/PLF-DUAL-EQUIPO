import machine
from machine import Pin, SoftI2C
from lcd_api import LcdApi
from i2c_lcd import I2cLcd
from time import sleep, sleep_ms

# Configuración del LCD
i2c_addr = 0x27
totalRows = 4
totalColumns = 20

i2c = SoftI2C(scl=Pin(22), sda=Pin(21), freq=40000)
lcd = I2cLcd(i2c, i2c_addr, totalRows, totalColumns)

# Configuración de botones (pull-up interno)
product1_btn = Pin(4, Pin.IN, Pin.PULL_UP)   # Chips - $17
product2_btn = Pin(5, Pin.IN, Pin.PULL_UP)   # Takis - $17
product3_btn = Pin(13, Pin.IN, Pin.PULL_UP)  # Coca - $15
product4_btn = Pin(14, Pin.IN, Pin.PULL_UP)  # Pepsi - $20
product5_btn = Pin(15, Pin.IN, Pin.PULL_UP)  # Jumex - $20
config_btn = Pin(18, Pin.IN, Pin.PULL_UP)    # Configuración
coin_btn = Pin(19, Pin.IN, Pin.PULL_UP)      # Crédito ($1)
green_btn = Pin(25, Pin.IN, Pin.PULL_UP)     # Comprar
red_btn = Pin(26, Pin.IN, Pin.PULL_UP)       # Cancelar

# Variables de estado
current_credits = 0
selected_product = None
selected_price = 0

# Catálogo de productos
products = {
    1: {"name": "Chips", "price": 17},
    2: {"name": "Takis", "price": 17},
    3: {"name": "Coca", "price": 20},
    4: {"name": "Pepsi", "price": 20},
    5: {"name": "Jumex", "price": 18}
}

# ================= FUNCIONES LCD =================
def init_static_display():
    """Inicializa las partes fijas de la pantalla"""
    lcd.clear()
    lcd.move_to(0, 0)
    lcd.putstr("Maquina Expendedora")
    lcd.move_to(0, 3)
    lcd.putstr("Inserte monedas")

def update_credits():
    lcd.move_to(0, 2)
    credit_text = f"Creditos: ${current_credits}"
    lcd.putstr(credit_text + " " * (20 - len(credit_text)))  # Rellena con espacios

def update_product_display():
    lcd.move_to(0, 1)
    if selected_product:
        product_info = f"{products[selected_product]['name']} - ${products[selected_product]['price']}"
        lcd.putstr(product_info + " " * (20 - len(product_info)))  # 20 caracteres
    else:
        lcd.putstr("Seleccione producto" + " " * 3)  # 17 + 3 espacios = 20

def display_full_message(line1, line2="", line3="", line4=""):
    """Mensajes completos (compra/cancelación)"""
    lcd.clear()
    for i, line in enumerate([line1, line2, line3, line4]):
        if line:
            lcd.move_to(0, i)
            lcd.putstr(line)

# ================= INICIALIZACIÓN =================
init_static_display()
update_product_display()
update_credits()

# ================= LOOP PRINCIPAL =================
while True:
    # ----- Botones de producto -----
    if product1_btn.value() == 0:
        selected_product = 1
        selected_price = 17
        update_product_display()
        sleep_ms(10)
    
    if product2_btn.value() == 0:
        selected_product = 2
        selected_price = 17
        update_product_display()
        sleep_ms(10)
    
    if product3_btn.value() == 0:
        selected_product = 3
        selected_price = 15
        update_product_display()
        sleep_ms(10)
    
    if product4_btn.value() == 0:
        selected_product = 4
        selected_price = 20
        update_product_display()
        sleep_ms(10)
    
    if product5_btn.value() == 0:
        selected_product = 5
        selected_price = 20
        update_product_display()
        sleep_ms(10)
    
    # ----- Botón de crédito -----
    if coin_btn.value() == 0:
        current_credits += 1
        update_credits()
        sleep_ms(10)
    
    # ----- Botón de compra -----
    if green_btn.value() == 0 and selected_product and current_credits >= selected_price:
        display_full_message(
            "Producto comprado!",
            products[selected_product]['name'],
            f"Precio: ${selected_price}",
            f"Cambio: ${current_credits - selected_price}"
        )
        current_credits = 0
        selected_product = None
        sleep(3)
        init_static_display()
        update_product_display()
        update_credits()
        sleep_ms(10)
    
    # ----- Botón de cancelación -----
    if red_btn.value() == 0:
        display_full_message(
            "Operacion cancelada"
        )
        current_credits = 0
        selected_product = None
        sleep(2)
        init_static_display()
        update_product_display()
        update_credits()
        sleep_ms(10)
    
    # ----- Botón de configuración -----
    if config_btn.value() == 0:
        display_full_message("Modo Configuracion", "Acceso restringido")
        sleep(2)
        init_static_display()
        update_product_display()
        update_credits()
        sleep_ms(10)
    
    sleep_ms(10)