function DatTimeAndeLocationInfo({ date, time, solarNoon, sunrise, sunset, timezone, latitude, longitude }) {
    return (
        <List>
            <Divider />
            <ListItem>
                <ListItemText primary={`Date: ${date ? date : 'N/A'}`} />
            </ListItem>
            <Divider />
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <ListItemText primary={`Time: ${time ? time : 'N/A'}`} />
                    </Grid>
                    <Grid item xs={6}>
                        <ListItemText primary={`Timezone: ${timezone !== undefined ? `UTC${timezone >= 0 ? '+' + timezone : '-' + timezone}` : 'N/A'}`} />
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
            <ListItem>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <ListItemText primary={`Solar Noon:\n${solarNoon ? `${solarNoon.getHours() + timezone}:${solarNoon.getMinutes()} UTC${timezone >= 0 ? '+' + timezone : '-' + timezone}` : 'N/A'}`} />
                    </Grid>
                    <Grid item xs={3}>
                        <ListItemText primary={`Sunrise:\n${sunrise ? `${sunrise.getHours() + timezone}:${sunrise.getMinutes()} UTC${timezone >= 0 ? '+' + timezone : '-' + timezone}` : 'N/A'}`} />
                    </Grid>
                    <Grid item xs={4}>
                        <ListItemText primary={`Sunset:\n${sunset ? `${sunset.getHours() + timezone}:${sunset.getMinutes()} UTC${timezone >= 0 ? '+' + timezone : '-' + timezone}` : 'N/A'}`} />
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <ListItemText primary={`Latitude: ${latitude ? latitude.toFixed(6) : 'N/A'}°`} />
                    </Grid>
                    <Grid item xs={6}>
                        <ListItemText primary={`Longitude: ${longitude ? longitude.toFixed(6) : 'N/A'}°`} />
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
        </List>
    );
}