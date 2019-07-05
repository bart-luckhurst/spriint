import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ProjectEpicsComponent } from './project-epics/project-epics.component';
import { ProjectIssuesComponent } from './project-issues/project-issues.component';
import { ProjectBoardComponent } from './project-board/project-board.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':projectId/overview', component: ProjectOverviewComponent },
  { path: ':projectId/epics', component: ProjectEpicsComponent },
  { path: ':projectId/issues', component: ProjectIssuesComponent },
  { path: ':projectId/board', component: ProjectBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
