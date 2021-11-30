interface User_interface {
    login: string;
    password: string;
    email: string;
    isActivated: boolean;
    activateId: string;
}

interface User_link_interface {
    login: string,
    links: [
        {
            original: string,
            short: string,
            statistic: {
                clicks: number
            }
        }
    ]
}

export {
    User_interface,
    User_link_interface
}