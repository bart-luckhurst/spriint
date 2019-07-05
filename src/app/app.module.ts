import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { UserSwitchComponent } from './user-switch/user-switch.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ProjectEpicsComponent } from './project-epics/project-epics.component';
import { ProjectIssuesComponent } from './project-issues/project-issues.component';
import { ProjectBoardComponent } from './project-board/project-board.component';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';
import { EditProjectModalComponent } from './edit-project-modal/edit-project-modal.component';
import { DeleteProjectModalComponent } from './delete-project-modal/delete-project-modal.component';
import { CreateEpicModalComponent } from './create-epic-modal/create-epic-modal.component';
import { EditEpicModalComponent } from './edit-epic-modal/edit-epic-modal.component';
import { DeleteEpicModalComponent } from './delete-epic-modal/delete-epic-modal.component';
import { HomeComponent } from './home/home.component';
import { CreateIssueModalComponent } from './create-issue-modal/create-issue-modal.component';
import { EditIssueModalComponent } from './edit-issue-modal/edit-issue-modal.component';
import { DeleteIssueModalComponent } from './delete-issue-modal/delete-issue-modal.component';
import { DraggableDirective } from './draggable.directive';
import { DroppableDirective } from './droppable.directive';
import { BoardIssueComponent } from './board-issue/board-issue.component';
import { ConfigService } from './config.service';

export function initializeApp(configService: ConfigService) {
  return () => configService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    ThemeSwitchComponent,
    UserSwitchComponent,
    NavMenuComponent,
    NavButtonComponent,
    ProjectOverviewComponent,
    ProjectEpicsComponent,
    ProjectIssuesComponent,
    ProjectBoardComponent,
    CreateProjectModalComponent,
    EditProjectModalComponent,
    DeleteProjectModalComponent,
    CreateEpicModalComponent,
    EditEpicModalComponent,
    DeleteEpicModalComponent,
    HomeComponent,
    CreateIssueModalComponent,
    EditIssueModalComponent,
    DeleteIssueModalComponent,
    DraggableDirective,
    DroppableDirective,
    BoardIssueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
