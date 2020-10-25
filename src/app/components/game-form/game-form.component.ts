import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  game: Game = {
    id: 0,
    created_at: new Date(),
    description: '',
    image: '',
    title: ''
  };

  edit: boolean = false;

  constructor(private gameService: GamesService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const param = this.activeRoute.snapshot.params['id']
    if(param) {
      this.gameService.getGame(param).subscribe((game: Game) => {
        // console.log(game);
        this.game = game;
        this.edit = true;
      }, error => {
        console.log(error);
      })
    }
  }

  saveNewGame() {
    delete this.game.created_at;
    delete this.game.id;
    // console.log(this.game);
    this.gameService.saveGame(this.game).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/games']);
    }, error => console.log(error))
  }

  updateGame() {
    delete this.game.created_at;
    // console.log(this.game);
    this.gameService.updateGame(this.game.id, this. game).subscribe((resp) => {
      console.log(resp);
      this.router.navigate(['/games']);
    }, error => console.log(error));
  }

}
