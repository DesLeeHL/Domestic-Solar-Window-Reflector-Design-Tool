import numpy as np
import matplotlib.pyplot as plt
# from matplotlib.widgets import Slider

fig=plt.figure()
ax=fig.add_subplot(111)

def draw_reflector_model(ax,solar_zenith,reflector_length,reflector_angle,window_height):
    
    def draw_light_in(x_pos,y_pos):
        light_slope=-np.tan((90-solar_zenith)*np.pi/180)
        light_left_lim=-reflector_length*np.cos(reflector_angle*np.pi/180)*1.1
        ax.plot([x_pos,light_left_lim],[y_pos,light_slope*(light_left_lim-x_pos)+y_pos],color='orange',label='Sunlight In',linestyle='-')
    
    def draw_vertical_line(x_pos,y_pos):
        line_length=reflector_length/4
        ax.plot([x_pos,x_pos],[y_pos,y_pos+line_length],color='black',label='Vertical Line',linestyle='-.')

    def draw_reflection_axis(x_pos,y_pos):
        line_length=reflector_length/4
        ax.plot([x_pos,x_pos+line_length*np.sin(reflector_angle*np.pi/180)],[y_pos,y_pos+line_length*np.cos(reflector_angle*np.pi/180)],color='black',label='Reflection Axis',linestyle=':')

    def draw_window(height):
        ax.plot([0,0],[0,height],color='blue',label='Window',linestyle='--')

    def draw_reflector(length,angle):
        end_point_x=-length*np.cos(angle*np.pi/180)
        end_point_y=length*np.sin(angle*np.pi/180)
        ax.plot([0,end_point_x],[0,end_point_y],color='cyan',label='Reflector',linestyle='-')
   
    draw_window(height=window_height)

    draw_reflector(length=reflector_length,angle=reflector_angle)

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
        ax.plot(x,y,color='yellow',label='Reflected Sunlight',linestyle='-')
        draw_light_in(outmost_reflection_point_x,outmost_reflection_point_y)
        draw_reflection_axis(outmost_reflection_point_x,outmost_reflection_point_y)
    else:
        print('Top reflection lower than window')
        draw_vertical_line(reflector_end_x,reflector_end_y)
        x=[reflector_end_x,0]
        y=[reflector_end_y,top_reflected_light_y]
        ax.plot(x,y,color='yellow',label='Reflected Sunlight',linestyle='-')
        draw_light_in(reflector_end_x,reflector_end_y)
        draw_reflection_axis(reflector_end_x,reflector_end_y)

    # axcolor = 'lightgoldenrodyellow'
    # ax_zenith=plt.axes([0.25, 0.1, 0.65, 0.03], facecolor=axcolor)
    # ax_ref_len=plt.axes([0.25, 0.1, 0.65, 0.03], facecolor=axcolor)
    # ax_ref_ang=plt.axes([0.25, 0.1, 0.65, 0.03], facecolor=axcolor)
    # ax_win_ht=plt.axes([0.25, 0.1, 0.65, 0.03], facecolor=axcolor)

    # s_zenith=Slider(ax_zenith,'Solar Zenith',0,90,valinit=solar_zenith,valstep=0.1)
    # s_ref_len=Slider(ax_ref_len,'Reflector Length',0,10,valinit=reflector_length,valstep=0.1)
    # s_ref_ang=Slider(ax_ref_ang,'Reflector Angle',0,90,valinit=reflector_angle,valstep=0.1)
    # s_win_ht=Slider(ax_win_ht,'Window Height',0,10,valinit=window_height,valstep=0.1)

    # def update(val):
    #     zenith=s_zenith.val
    #     ref_len=s_ref_len.val
    #     ref_angle=s_ref_ang.val
    #     win_ht=s_win_ht.val

draw_reflector_model(ax=ax,
                    solar_zenith=30,
                    reflector_length=8,
                    reflector_angle=20,
                    window_height=8)

ax.set_aspect('equal')
plt.legend()
plt.show()