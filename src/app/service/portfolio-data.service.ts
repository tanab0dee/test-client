import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { EnvEndpointService } from 'src/app/service/env.endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {
  
  private itemDeletedSubject = new Subject<void>();
  private newItemAddedSubject = new Subject<void>();
  private selectedSkillSubject = new Subject<string>();
  private nameSkill:string = "";
  private filteredSkills: any[] = [];
  
  ENV_REST_API = `${this.envEndpointService.ENV_REST_API}`

  constructor(
    private http: HttpClient,
    private envEndpointService: EnvEndpointService
    ) { }

  setFilteredSkills(filteredSkills: any[]): void {
    this.filteredSkills = filteredSkills;
  }

  setNameSkills(nameSkill: string): void {
    this.nameSkill = nameSkill;
  }

  getFilteredSkills(): any[] {
    return this.filteredSkills;
  }
  getNameSkills(): string {
    return this.nameSkill;
  }

  

  // GET
  getEducationData(): Observable<any> {
    return this.http.get<any>(`${this.ENV_REST_API}/getEducation`, {
      withCredentials: true,
    });
  }
  getExperienceData(): Observable<any> {
    return this.http.get<any>(`${this.ENV_REST_API}/getExperience`, {
      withCredentials: true,
    });
  }
  getLinkData(): Observable<any> {
    return this.http.get<any>(`${this.ENV_REST_API}/getLink`, {
      withCredentials: true,
    });
  }
  getAllSkillNames(): Observable<any> {
    return this.http.get<any>(`${this.ENV_REST_API}/getHistory`, {
      withCredentials: true,
    });
  }

  notifySkillSelected(skill: string): void {
    this.selectedSkillSubject.next(skill);
  }

  getSelectedSkillSubject(): Observable<string> {
    return this.selectedSkillSubject.asObservable();
  }

  // POST
  saveEducation(formData: any): Observable<any> {
    return this.http
      .post(`${this.ENV_REST_API}/createEducation`, formData, {
        withCredentials: true,
      })
      .pipe(tap(() => this.newItemAddedSubject.next()));
  }
  saveExperience(formData: any): Observable<any> {
    return this.http
      .post(`${this.ENV_REST_API}/createExperience`, formData, {
        withCredentials: true,
      })
      .pipe(tap(() => this.newItemAddedSubject.next()));
  }
  saveLink(formData: any): Observable<any> {
    return this.http
      .post(`${this.ENV_REST_API}/createLink`, formData, {
        withCredentials: true,
      })
      .pipe(tap(() => this.newItemAddedSubject.next()));
  }

  getNewItemAddedSubject(): Observable<void> {
    return this.newItemAddedSubject.asObservable();
  }

  // PUT
  updateEducation(formData: any): Observable<any> {
    const educationId = formData.education_id;
    return this.http.put(
      `${this.ENV_REST_API}/updateEducation?education_id=${educationId}`,
      formData,
      {
        withCredentials: true,
      }
    );
  }
  updateExperience(formData: any): Observable<any> {
    const experienceId = formData.exp_id;
    return this.http.put(
      `${this.ENV_REST_API}/updateExperience?exp_id=${experienceId}`,
      formData,
      {
        withCredentials: true,
      }
    );
  }
  updateLink(formData: any): Observable<any> {
    const linkId = formData.link_id;
    return this.http.put(
      `${this.ENV_REST_API}/updateLink?link_id=${linkId}`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  // DELETE
  deleteEducation(educationId: string): Observable<any> {
    return this.http
      .delete(`${this.ENV_REST_API}/deleteEducation?education_id=${educationId}`, {
        withCredentials: true,
      })
      .pipe(
        // Notify subscribers when an item is deleted
        tap(() => this.itemDeletedSubject.next())
      );
  }
  deleteExperience(experienceId: string): Observable<any> {
    return this.http
      .delete(`${this.ENV_REST_API}/deleteExperience?exp_id=${experienceId}`, {
        withCredentials: true,
      })
      .pipe(
        // Notify subscribers when an item is deleted
        tap(() => this.itemDeletedSubject.next())
      );
  }
  deleteLink(linkId: string): Observable<any> {
    return this.http
      .delete(`${this.ENV_REST_API}/deleteLink?link_id=${linkId}`, {
        withCredentials: true,
      })
      .pipe(
        // Notify subscribers when an item is deleted
        tap(() => this.itemDeletedSubject.next())
      );
  }

  getItemDeletedSubject(): Observable<void> {
    return this.itemDeletedSubject.asObservable();
  }
}
