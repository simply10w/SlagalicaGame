import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { PermissionsGuard } from '@slagalica-app/core/guards';
import { UserType } from '@slagalica/data';
import { Subscription } from 'rxjs';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[slaHasPermission]'
})
export class HasPermissionDirective implements OnInit, OnDestroy {
  private created = false;
  private listenPermissions: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionsGuard: PermissionsGuard
  ) {}

  @Input('slaHasPermission') permissions: UserType[];

  ngOnInit() {
    this.listenPermissions = this.permissionsGuard
      .hasPermission(this.permissions)
      .subscribe(hasPermission => {
        hasPermission && !this.created
          ? this.viewContainer.createEmbeddedView(this.templateRef)
          : this.viewContainer.clear();

        this.created = hasPermission;
      });
  }

  ngOnDestroy() {
    if (this.listenPermissions) {
      this.listenPermissions.unsubscribe();
    }
  }
}
