import { Component, OnInit, HostBinding } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: Game[] = [];
  @HostBinding('class') classes = 'row';

  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
   this.getGames();
  }

  getGames(){
    this.gameService.getGames().subscribe((games: Game[]) => {
      this.games = games;
    }, error => console.log(error));
  }

  deleteGame(idGame: string): void {
    // console.log(idGame);
    this.gameService.deleteGame(idGame).subscribe((resp) => {
      console.log(resp);
      this.getGames();
    }, error => {
      console.log(error);
    });
  }
}
