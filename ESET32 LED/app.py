from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return "Servidor Flask activo"

datos_recibidos = []

@app.route('/api/sensores', methods=['POST'])
def recibir_datos():
    data = request.get_json()
    print("📥 Datos recibidos del ESP32:", data)
    datos_recibidos.append(data)
    return '', 200

@app.route('/ver_datos', methods=['GET'])
def ver_datos():
    return jsonify(datos_recibidos)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
