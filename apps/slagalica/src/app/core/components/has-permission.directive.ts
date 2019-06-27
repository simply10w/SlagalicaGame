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
        if (hasPermission && !this.created) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.created = true;
        } else if (!hasPermission) {
          this.viewContainer.clear();
          this.created = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.listenPermissions) {
      this.listenPermissions.unsubscribe();
    }
  }
}
