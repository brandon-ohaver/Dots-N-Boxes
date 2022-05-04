import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const Introduction = () => {
    return(
            <div style={{ justifyContent: "center", alignItems: "center", textAlign: "center", display: "flex", marginBottom: "2%" }}>
                <Card variant="outlined" style={{ background: "rgb(209, 35, 50)" }}>
                    <CardContent>
                        <Typography variant="h5" style={{ color: "white", fontFamily: "Tahoma" }}>
                    Hello and welcome to Dots-N-Boxes! In this React-based application,
                    <br/> 
                    you and your friends can go head-to-head in a standard game of dots 
                    <br/>
                    and boxes with varying sizes of boards! And if you don't have a buddy
                    <br/>
                    to play with, don't worry as you can still play our singleplayer mode
                    <br/> 
                    and face-off against Earl, our A.I. competitor!
                    </Typography>
                    </CardContent>
                </Card>
                
            </div>
                    
        
    )
    
}

export default Introduction