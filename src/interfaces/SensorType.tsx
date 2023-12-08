export interface Sensor {
    velocity: number;
    altitude: number;
    temperature: number;
    statusMessage: string;
    isAscending: boolean;
    isActionRequired: boolean;
}

export interface LiveSensor {
    Velocity: number;
    Altitude: number;
    Temperature: number;
    StatusMessage: string;
    IsAscending: boolean;
    IsActionRequired: boolean;
}