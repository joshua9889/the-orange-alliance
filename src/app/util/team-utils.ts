import Team from "../models/Team";

/**
 * Created by Kyle Flynn on 7/30/2017.
 */
export class TeamFilter {

  private teams: Team[];
  private teamsFiltered: Team[];

  constructor(teams: any) {
    this.teams = teams;
  }

  public filterArray(region_query: string, name_query: string, location_query: string, league_query: string) {
    if (region_query || name_query || location_query || league_query) {
      this.teamsFiltered = this.teams.filter((team: Team) => {
        const team_number = (team.teamNumber + '' || 'null').toLowerCase();
        const team_school = (team.teamNameLong + '' || 'null').toLowerCase();
        const team_name = (team.teamNameShort + '' || 'null').toLowerCase();
        const team_region = (team.regionKey + '' || 'null').toLowerCase();
        const team_league = (team.leagueKey + '' || 'null').toLowerCase();
        const team_city = (team.city + '' || 'null').toLowerCase();
        const team_state_prov = (team.stateProv + '' || 'null').toLowerCase();
        const team_country = (team.country + '' || 'null').toLowerCase();

        let contains_region = false;
        let contains_number = false;
        let contains_school = false;
        let contains_name = false;
        let contains_city = false;
        let contains_state_prov = false;
        let contains_country = false;
        let contains_league = false;

        if (region_query) {
          region_query = region_query.toLowerCase();
          contains_region = (team_region === region_query);
        }
        // Search functionality
        if (name_query) {
          name_query = name_query.toLowerCase();
          contains_number = false;
          const quieres = name_query.split(' ');
          // console.log(quieres);
          for (let q = 0; q < quieres.length; q += 1) {
            contains_number = contains_number || (team_number.indexOf(quieres[q]) > -1);
          }
          // So searching "3113 - Some Disassembly Required" but "Some 113" should still match.
          contains_name = (team_name.indexOf(name_query) > -1);
          contains_school = (team_school.indexOf(name_query) > -1);
        }

        if (location_query) {
          location_query = location_query.toLowerCase();
          contains_city = (team_city.indexOf(location_query) > -1);
          contains_state_prov = (team_state_prov.indexOf(location_query) > -1);
          contains_country = (team_country.indexOf(location_query) > -1);
        }

        if (league_query) {
          league_query = league_query.toLowerCase();
          contains_league = (team_league === league_query);
        }

        return contains_number || contains_name || contains_region || contains_school
        || contains_league || contains_city || contains_state_prov || contains_country;
      });
    } else {
      this.teamsFiltered = this.teams;
    }
  }

  public getOriginalArray() {
    return this.teams;
  }

  public getFilteredArray() {
    return this.teamsFiltered;
  }

}

export class TeamSorter {

  constructor() {}

  public sort(items, left, right) {
    let pivot, partitionIndex;

    if (left < right) {
      pivot = right;
      partitionIndex = this.partition(items, pivot, left, right);

      this.sort(items, left, partitionIndex - 1);
      this.sort(items, partitionIndex + 1, right);
    }

    return items;
  }

  private partition(items, pivot, left, right) {
    const pivotValue = items[pivot];
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
      // -1 means items[i] < pivotValue, 1 means items[i] > pivotValue
      if (items[i].teamNumber < pivotValue.teamNumber) {
        this.swap(items, i, partitionIndex);
        partitionIndex++;
      }
    }
    this.swap(items, right, partitionIndex);
    return partitionIndex;
  }

  private swap(items, index1, index2) {
    const temp = items[index1];
    items[index1] = items[index2];
    items[index2] = temp;
  }

}
