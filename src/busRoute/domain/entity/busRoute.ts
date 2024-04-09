export class BusRoute {
    constructor(
        readonly uuid: string,
        readonly name: string,
        readonly price: number,
        readonly startTime: string,
        readonly endTime: string,
        readonly busStopId: string,
        readonly deletedAt: Date | null
    ) {
    }
}