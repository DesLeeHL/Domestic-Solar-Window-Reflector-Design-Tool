import numpy as np
class Sun:
    def __init__(self,zenith):
        self.zenith_angle =zenith
    
    #https://en.wikipedia.org/wiki/Solar_zenith_angle
    def get_cos_solar_zenith_angle(local_lat,declination,hour_angle):
        cos_solar_zenith_angle =np.sin(local_lat*np.pi/180)*np.sin(declination*np.pi/180)
        +np.cos(local_lat*np.pi/180)*np.cos(declination*np.pi/180).np.cos(hour_angle*np.pi/180)
        return cos_solar_zenith_angle

    def get_solar_declination(num_days_after_dec_solstice):
        solar_declination_angle=-23.44*np.cos((360/365*(num_days_after_dec_solstice+10))*np.pi/180)
        return solar_declination_angle

    #TODO
    #https://en.wikipedia.org/wiki/Hour_angle
    def get_hour_angle():
        return 0