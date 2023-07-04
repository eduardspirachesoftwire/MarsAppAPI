export enum CameraTypes {
    FHAZ,
    RHAZ,
    MAST,
    CHEMCAM,
    MAHLI,
    MARDI,
    NAVCAM,
    PANCAM,
    MINITES
}

export interface Camera {
    id: number;
    name: CameraTypes;
    rover_id: number;
    full_name: string;
}