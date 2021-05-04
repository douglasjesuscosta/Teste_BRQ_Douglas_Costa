import { ElementRef } from '@angular/core'
import { ViewChild } from '@angular/core'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'

import { UsuarioClientService } from '../users-client.service'

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
    public user
    public userForm: FormGroup
    public isSaved: boolean
    public isUpdate: boolean
    public isLoading: boolean
    public isSubmitted: boolean

    @ViewChild('modal', { static: true }) modal: ElementRef

    constructor(
        private formBuilder: FormBuilder,
        private userService: UsuarioClientService,
        private modalService: NgbModal,
        private config: NgbModalConfig,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.initializeValues(config)

        let value = this.route.firstChild && this.route.firstChild.data['value']
        this.user = value && value['userUpdate']
        this.isUpdate = this.user && this.user.id ? true : false

        this.createForm(this.user)
    }

    /**
     * Method to initialize values.
     * @param config
     */
    private initializeValues(config: NgbModalConfig) {
        this.isLoading = false
        this.isSaved = false
        config.backdrop = 'static'
        config.keyboard = false
        this.isSubmitted = false
    }

    ngOnInit(): void {}

    /**
     * Method to initialize the form.
     */
    createForm(user) {
        //let formattedBirthday = user !== null ? new Date(user.birthday) : null

        this.userForm = this.formBuilder.group({
            id: [user !== null ? user.id : null],
            name: [user !== null ? user.name : null, Validators.required],
            cpf: [user !== null ? user.cpf : null, Validators.required],
            email: [user !== null ? user.email : null, Validators.required],
            telephone: [user !== null ? user.telephone : null, Validators.required],
            sex: [user !== null ? user.sex : null, Validators.required],
            birthday: [user !== null ? user.birthday : null, Validators.required],
        })
    }

    /**
     * Getters of form fields for validation.
     */
    get nameInput() {
        return this.userForm.get('name')
    }
    get cpfInput() {
        return this.userForm.get('cpf')
    }
    get emailInput() {
        return this.userForm.get('email')
    }
    get telephoneInput() {
        return this.userForm.get('telephone')
    }
    get sexInput() {
        return this.userForm.get('sex')
    }
    get birthdayInput() {
        return this.userForm.get('birthday')
    }

    /**
     * Save User data.
     *
     * */
    public saveUser(): void {
        this.isSubmitted = true

        console.log(this.userForm.status)
        if (this.userForm.valid) {
            this.isLoading = true
            let userObject = this.userForm.value

            if (this.isUpdate) {
                this.updateUser(userObject)
            } else {
                this.persistUser(userObject)
            }
        }
    }

    /**
     * Persist user data.
     *
     * @param userObject
     *
     */
    private persistUser(userObject: any) {
        this.userService.save(userObject).subscribe(
            (value) => {
                this.showSuccessFeedback(value)
            },
            (error) => {
                this.showErrorFeedback(error)
            }
        )
    }

    /**
     * Update User.
     *
     * @param userObject
     */
    private updateUser(userObject) {
        this.userService.update(userObject).subscribe(
            (value) => {
                this.showSuccessFeedback(value)
            },
            (error) => {
                this.showErrorFeedback(error)
            }
        )
    }

    public showSuccessFeedback(value) {
        this.isLoading = false
        this.isSaved = true
        this.openSuccessModal()
    }

    private showErrorFeedback(error) {
        this.isLoading = false
        this.isSaved = false
        this.openFailuerModal()
    }

    private openSuccessModal() {
        this.modalService.open(this.modal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            (result) => {
                this.router.navigate([`users/`])
            },
            (reason) => {
                this.router.navigate([`users/`])
            }
        )
    }

    private openFailuerModal() {
        this.modalService.open(this.modal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            (result) => {},
            (reason) => {}
        )
    }

    private fromJsonDate(jDate): string {
        const bDate: Date = new Date(jDate)
        return bDate.toISOString().substring(0, 10)
    }

    public back() {
        this.router.navigate([`users/`])
    }
}
