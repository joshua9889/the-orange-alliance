import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import Match from '../../models/Match';
import Event from '../../models/Event';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import {SafeResourceUrl} from "@angular/platform-browser/src/security/dom_sanitization_service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'toa-match',
  templateUrl: './matches.component.html',
  providers: [FTCDatabase]
})
export class MatchesComponent implements OnInit {

  matchKey: any;

  match: Match;
  event: Event;
  videoSafeURL: SafeResourceUrl;

  constructor(private ftc: FTCDatabase, private router: Router, private sanitizer: DomSanitizer, private route: ActivatedRoute, private app: TheOrangeAllianceGlobals) {
    this.matchKey = this.route.snapshot.params['match_key'];
  }

  ngOnInit() {
    this.ftc.getMatchDetails(this.matchKey).then((match: Match) => {
      if (match) {
        this.match = match;

        if (match.videoURL != null) {
          let videoID = match.videoURL.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
          if (videoID && videoID[2].length == 11) {
            this.videoSafeURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoID[2]);
          }
        }

        this.ftc.getEventBasic(match.eventKey).then((event: Event) => {
          this.event = event;
          this.app.setTitle(this.match.matchName + ' - ' + this.event.eventName);
        });
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  getMatchSeason(): number {
    const match = this.matchKey.substr(0, 4);
    try {
      const seasonKey = parseInt(match);
      return seasonKey;
    } catch (e) {
      return 0;
    }
  }

}
