import { ViewChild } from '@angular/core'
import { ElementRef } from '@angular/core'
import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ActivatedRoute, Router } from '@angular/router'

import { UsuarioClientService } from '../users-client.service'

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
    public users = []
    public isLoading: boolean
    public showSuccessMessage: boolean

    @ViewChild('modalConfirmation', { static: true }) modalConfirmation: ElementRef

    constructor(private route: ActivatedRoute, private router: Router, private userService: UsuarioClientService, private modalService: NgbModal) {
        this.users = route.snapshot.data['users']
        this.isLoading = false
        this.showSuccessMessage = false
    }

    ngOnInit(): void {}

    public editUser(user) {
        this.router.navigate([`users/create/${user.id}`])
    }

    public deleteUserButtonClick(user) {
        this.openConfirmationModal(user)
    }

    private openConfirmationModal(user) {
        this.modalService.open(this.modalConfirmation, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            (result) => {
                this.isLoading = true
                this.continueUserExclusion(user)
            },
            (reason) => {
                this.router.navigate([`users/`])
            }
        )
    }

    private continueUserExclusion(user) {
        this.userService.delete(user).subscribe(
            () => {
                this.refreshListAfterExclusion()
            },
            () => {
                this.isLoading = false
            }
        )
    }

    private refreshListAfterExclusion() {
        this.userService.getUsuarios().subscribe(
            (users) => {
                this.users = users
                this.isLoading = false
            },
            (err) => {}
        )
    }
}
