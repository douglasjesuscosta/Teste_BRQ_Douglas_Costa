import { ElementRef } from '@angular/core'
import { ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { formatDate } from '@angular/common'
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'

import { User } from 'src/app/model/User'
import { UsuarioClientService } from '../users-client.service'

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
    public user
    public userForm: FormGroup
    public isLoading: boolean
    public isSaved: boolean
    public isUpdate: boolean

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

    private initializeValues(config: NgbModalConfig) {
        this.isLoading = false
        this.isSaved = false
        config.backdrop = 'static'
        config.keyboard = false
    }

    ngOnInit(): void {}

    /**
     * Method to initialize the form
     *
     */
    createForm(user) {
        //let formattedBirthday = user !== null ? new Date(user.birthday) : null

        this.userForm = this.formBuilder.group({
            id: [user !== null ? user.id : null],
            name: [user !== null ? user.name : null],
            cpf: [user !== null ? user.cpf : null],
            email: [user !== null ? user.email : null],
            telephone: [user !== null ? user.telephone : null],
            sex: [user !== null ? user.sex : null],
            birthday: [user !== null ? user.birthday : null],
        })
    }

    /**
     * Save User data.
     *
     * */
    public saveUser(): void {
        this.isLoading = true
        let userObject = this.userForm.value

        if (this.isUpdate) {
            this.updateUser(userObject)
        } else {
            this.persistUser(userObject)
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
}
