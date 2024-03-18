from fastapi import FastAPI
from sense_hat import SenseHat

sense = SenseHat()

app = FastAPI()

@app.get("/api/humidity")
def humidity_data():
    
    return {"value": str(sense.get_humidity())}

@app.get("/api/env")
def temp_data():
    return {"humidity" : str(sense.get_humidity()),
            "temperature": str(sense.get_temperature()),
            "tempfrmhum" : str(sense.get_temperature_from_humidity()),
            "tempfrmpressure" : str(sense.get_temperature_from_pressure()),
            "pressure" : str(sense.get_pressure())}

@app.get("/api/tempfrmhumidity")
def temphum_data():
    return {"value" : str(sense.get_temperature_from_humidity())}

@app.get("/api/tempfrmpressure")
def temppre_data():
    return {"value" : str(sense.get_temperature_from_pressure())}

@app.get("/api/pressure")
def pressure_data():
    return {"value" : str(sense.get_temperature_from_pressure())}


@app.get("/api/python")
def hello_world():
	return {"Hello" : "World"}
