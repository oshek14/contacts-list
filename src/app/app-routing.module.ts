import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/mainstream/mainstream.module').then(
        (m) => m.MainstreamModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
