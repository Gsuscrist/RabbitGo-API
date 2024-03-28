import express from 'express';
import {Signale} from 'signale';
import {userRoute} from "./user/infrastructure/route/userRoute";
import {busStopRouter} from "./busStop/infrastructure/routes/busStopRoute";

const app = express();
const signale = new Signale();

app.use(express.json())

app.use('/user', userRoute);
app.use('/bus/stop', busStopRouter)

app.listen(8080,()=>{
    signale.success("Server on line in port: 8080")
})