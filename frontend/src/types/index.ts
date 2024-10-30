
export type Color = {
    id: number | null,
    name: string,
    value: string
}

export type Task = {
    id: number,
    description: string,
    isCompleted: boolean,
    time_of_creation: string,
    dateStr: string | null,
    timeStr: string | null,
    folder: {
        id: number | null,
        name: string | null
    }
}

export type Project = {
    id: number,
    name: string,
    color_id: number | null
}

export type Section = {
    id: number | string;
    name: string;
    leftIcon?: string;
    tasksNum: number | null;
    selected: boolean;
    isAProject: boolean;
    colorVal?: string;
    colorId?: number | null;
}

export type MenuList = {
    title: string,
    iconName?: string,
    colorStr?: string,
    selected?: boolean,
    onClick: () => void
}[]