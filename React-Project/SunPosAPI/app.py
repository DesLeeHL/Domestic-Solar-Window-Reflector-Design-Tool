from flask import Flask, request, jsonify
import SunPos  # Assuming you have sunposCode.py in the same directory

app = Flask(__name__)

@app.route('/sunpos', methods=['POST'])
def sunpos():
    data = request.json
    when = data['when']
    location = data['location']
    refraction = data.get('refraction', False)

    azimuth, elevation = SunPos.solar_position(when, location, refraction)
    return jsonify({'azimuth': azimuth, 'elevation': elevation})

if __name__ == '__main__':
    app.run(debug=True)