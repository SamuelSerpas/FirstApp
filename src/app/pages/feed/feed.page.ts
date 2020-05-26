import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Tasks } from '../../interfaces/tasks';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
 
  tasks: Tasks[] = [];

  constructor(
    private toastCtrl: ToastController, 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, 
    private taskService: TasksService) {}

  async ngOnInit(){
    const loaging = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    await loaging.present();
    this.taskService.getAllTasks()
    .subscribe(async task => {
      this.tasks = task;
      await loaging.dismiss();
    });
  }

  getTask() {
    this.taskService.getTask('2')
    .subscribe(task => {
      this.tasks;
    })
  }

  updateTask(){
    const task = {
      id: '200',
      userId: '1',
      title: 'por otro titulo',
      completed: true
    };
    this.taskService.updateTask(task)
    .subscribe((todo) =>{
      console.log(todo);
    } )
  }

  deleteTask(id:string, index: number) {
    this.taskService.deleteTask(id)
    .subscribe(() => {
      this.tasks.splice(index, 1);
      this.presentToast('Su tarea fue eliminada correctamente');
    })
  }

  async openAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Nueva Tarea!',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Aqui la tarea'
        },
      ],
      buttons:[
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler:() => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'crear',
          handler:(data) =>{
            this.createTask(data.title);
          }
        }
      ]
    });
    await alert.present();
  }
  
  async createTask(title: string){
    const loaging = await this.loadingCtrl.create({
      message: 'Creando...',
    });
    await loaging.present();
    const task = {
      userId: '1',
      title,
      completed: true
    };
    this.taskService.createTask(task)
    .subscribe(async(newTask) => {
      await loaging.dismiss();
      this.tasks.unshift(<any>newTask);
      this.presentToast('Tarea Creada');

    });
  } 
  
  async presentToast(message: string) {
    let toast = await this.toastCtrl.create({
      message, 
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
