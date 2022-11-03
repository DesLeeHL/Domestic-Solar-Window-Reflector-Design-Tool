import numpy as np
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D

fig=plt.figure()
ax=fig.add_subplot(111)

# def draw_window(ax,height):
#     x=[0,0]
#     y=[0,height]
#     ax.add_line(Line2D(x,y,color='blue'))
#     ax.set_ylim(0,height)

# draw_window(ax=ax,height=8)

# ax.show()

def draw_window(height):
    x=[0,0]
    y=[0,height]
    ax.plot(x,y,color='blue',label='Window',linestyle='--')

draw_window(height=2)

def draw_reflector(length,angle):
    end_point_x=-length*np.cos(angle*np.pi/180)
    end_point_y=length*np.sin(angle*np.pi/180)
    x=[0,end_point_x]
    y=[0,end_point_y]
    ax.plot(x,y,color='cyan',label='Reflector',linestyle='-')

draw_reflector(length=8,angle=20)



def window_detector(solar_zenith,reflector_length,reflector_angle,window_height):
    def draw_light_in(x_pos,y_pos,zenith):
        light_slope=-np.tan((90-zenith)*np.pi/180)
        light_left_lim=-reflector_length*np.sin(reflector_angle*np.pi/180)-1
        x=[x_pos,light_left_lim]
        y=[y_pos,light_slope*(light_left_lim-x_pos)+y_pos]
        ax.plot(x,y,color='orange',label='Light In',linestyle='-')
    
    def draw_vertical_line(x_pos,y_pos):
        line_height=2
        ax.plot([x_pos,x_pos],[y_pos,y_pos+line_height],color='black',label='Vertical Line',linestyle='-.')

    #reflected light slope: 90-2*ref_inc-solar_zenith
    reflector_end_x=-reflector_length*np.cos(reflector_angle*np.pi/180)
    reflector_end_y=reflector_length*np.sin(reflector_angle*np.pi/180)
    #reflcted light from outmost point of reflector on/above window
    reflected_light_slope=np.tan((90-solar_zenith-2*reflector_angle)*np.pi/180)
    top_reflected_light_y=reflected_light_slope*(0-reflector_end_x)+reflector_end_y

    if(top_reflected_light_y>window_height):
        print('Top reflection higher than window')
        outmost_reflection_point_x=-window_height/(reflected_light_slope+np.tan(reflector_angle*np.pi/180))
        outmost_reflection_point_y=-outmost_reflection_point_x*np.tan(reflector_angle*np.pi/180)
        draw_vertical_line(outmost_reflection_point_x,outmost_reflection_point_y)
        x=[outmost_reflection_point_x,0]
        y=[outmost_reflection_point_y,window_height]
        ax.plot(x,y,color='yellow',label='Reflected Light',linestyle='-')
        draw_light_in(outmost_reflection_point_x,outmost_reflection_point_y,solar_zenith)
    else:
        print('Top reflection lower than window')
        draw_vertical_line(reflector_end_x,reflector_end_y)
        x=[reflector_end_x,0]
        y=[reflector_end_y,top_reflected_light_y]
        ax.plot(x,y,color='yellow',label='Reflected Light',linestyle='-')
        draw_light_in(reflector_end_x,reflector_end_y,solar_zenith)


window_detector(solar_zenith=30,
reflector_length=8,
reflector_angle=20,
window_height=2)

ax.set_aspect('equal')
plt.legend()
plt.show()