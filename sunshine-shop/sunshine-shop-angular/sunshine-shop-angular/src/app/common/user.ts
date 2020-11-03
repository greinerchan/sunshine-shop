export class User {

    public id: number;
    public username: string;
    public userEmail: string;
    public userPassword: string;
    public userFirstName: string;
    public userLastName: string;
    public userProfileImageUrl: string;
    public lastLoginDate: Date;
    public lastLoginDateDisplay: Date;
    public joinDate: Date;
    public role: string;
    public authorities: [];
    public active: boolean;
    public nonLocked: boolean;

    constructor() {
		this.username = '';
		this.userEmail = '';
		this.userFirstName = '';
		this.userLastName = '';
		this.role = '';
		this.authorities = [];
		this.active = false;
		this.nonLocked = false;
	}




}
