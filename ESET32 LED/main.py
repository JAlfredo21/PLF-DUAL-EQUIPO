import machine
from machine import Pin, SoftI2C, ADC
from lcd_api import LcdApi
from i2c_lcd import I2cLcd
from time import sleep, sleep_ms, ticks_ms, ticks_diff

# Configuración del LCD
i2c_addr = 0x27
totalRows = 4
totalColumns = 20
i2c = SoftI2C(scl=Pin(22), sda=Pin(21), freq=40000)
lcd = I2cLcd(i2c, i2c_addr, totalRows, totalColumns)

# Configuración de las entradas analógicas
adc1 = ADC(Pin(15))  # Pin 15 para 5 botones de producto
adc2 = ADC(Pin(2))   # Pin 2 para botones de operación
adc1.atten(ADC.ATTN_11DB)
adc2.atten(ADC.ATTN_11DB)

# Variables para control de botones
last_button_time = 0
debounce_time = 300  # 300ms para evitar rebotes
current_button = "Ninguno"

# Rangos de ADC para cada botón - AJUSTADOS SEGÚN CALIBRACIÓN
# Formato: [min_value, max_value, button_id]
# Botones del pin 15 (productos)
BTN_15_RANGES = [
    [4094, 4095, 1],    # Producto 1 (Chips)
    [3900, 4094, 2],    # Producto 2 (Takis)
    [3000, 3500, 3],    # Producto 3 (Coca)
    [800, 1200, 4],    # Producto 4 (Pepsi)
    [10, 100, 5]       # Producto 5 (Jumex)
]

# Botones del pin 2 (operaciones)
BTN_2_RANGES = [
    [2700, 2900, "COIN"],     # Botón de crédito
    [2300, 2600, "BUY"],      # Botón de compra (verde)
    [900, 1400, "CANCEL"],    # Botón de cancelación (rojo)
    [100, 600, "CONFIG"]      # Botón de configuración
]

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

# Funciones LCD
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
    lcd.putstr(credit_text + " " * (20 - len(credit_text)))

def update_product_display():
    lcd.move_to(0, 1)
    if selected_product:
        product_info = f"{products[selected_product]['name']} - ${products[selected_product]['price']}"
        lcd.putstr(product_info + " " * (20 - len(product_info)))
    else:
        lcd.putstr("Seleccione producto" + " " * 3)

def display_full_message(line1, line2="", line3="", line4=""):
    """Mensajes completos (compra/cancelación)"""
    lcd.clear()
    for i, line in enumerate([line1, line2, line3, line4]):
        if line:
            lcd.move_to(0, i)
            lcd.putstr(line)

def identify_button(adc_value, ranges):
    """Identifica el botón basado en el valor ADC y los rangos definidos"""
    for range_min, range_max, btn_id in ranges:
        if range_min <= adc_value <= range_max:
            return btn_id
    return None

# Inicialización
init_static_display()
update_product_display()
update_credits()

# LOOP PRINCIPAL
while True:
    try:
        # Leer los valores analógicos
        value_pin15 = adc1.read()
        value_pin2 = adc2.read()
        
        current_time = ticks_ms()
        
        # Procesamiento de botones con debounce
        if ticks_diff(current_time, last_button_time) > debounce_time:
            # Identificar botones presionados
            product_button = identify_button(value_pin15, BTN_15_RANGES)
            operation_button = identify_button(value_pin2, BTN_2_RANGES)
            
            # ----- Botones de productos (PIN 15) -----
            if product_button in [1, 2, 3, 4, 5]:
                selected_product = product_button
                selected_price = products[product_button]["price"]
                update_product_display()
                last_button_time = current_time
            
            # ----- Botones de operación (PIN 2) -----
            elif operation_button == "COIN":
                current_credits += 1
                update_credits()
                last_button_time = current_time
                
            elif operation_button == "BUY" and selected_product and current_credits >= selected_price:
                cambio = current_credits - selected_price
                display_full_message(
                    "Producto comprado!",
                    products[selected_product]['name'],
                    f"Precio: ${selected_price}",
                    f"Cambio: ${cambio}"
                )
                current_credits = 0  # Se pierden todos los créditos, incluido el cambio
                selected_product = None
                last_button_time = current_time
                sleep(3)
                init_static_display()
                update_product_display()
                update_credits()
                
            elif operation_button == "CANCEL":
                display_full_message(
                    "Operacion cancelada"
                )
                current_credits = 0  # Se pierden todos los créditos
                selected_product = None
                last_button_time = current_time
                sleep(2)
                init_static_display()
                update_product_display()
                update_credits()
                
            elif operation_button == "CONFIG":
                display_full_message("Modo Configuracion", "Acceso restringido")
                last_button_time = current_time
                sleep(2)
                init_static_display()
                update_product_display()
                update_credits()
        
        # Pequeña pausa para reducir el uso de CPU
        sleep_ms(20)
        
    except Exception as e:
        # Manejo de errores
        lcd.clear()
        lcd.move_to(0, 0)
        lcd.putstr("Error:")
        lcd.move_to(0, 1)
        lcd.putstr(str(e)[:20])
        sleep(5)
        init_static_display()
        update_product_display()
        update_credits()
