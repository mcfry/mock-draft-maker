require 'csv'

if Team.all.count == 0
    teams_csv_path = File.expand_path("teams.csv", File.dirname(__FILE__))
    teams_data = CSV.read(teams_csv_path)
    teams_data.each do |td|
        city, name = td[1].split(" ")
        if city == "Las" or city == "Los" or city == "New" or city == "San" or city == "Green" or city == "Kansas" or city == "Tampa"
            citysplit = td[1].split(" ")
            city = citysplit[0,2].join(" ")
            name = citysplit[2]
        end

        team_hash = {
            name: name,
            city: city,
            abbreviation: td[2],
            conference: td[3],
            division: td[4]
        }

        begin
            puts Team.create!(team_hash)
        rescue => e
            puts "error: #{e.message}"
        end
    end
end

if Player.all.count == 0
    passing_hash = {}
    rushing_hash = {}
    receiving_hash = {}
    defensive_hash = {}

    passing_csv_path = File.expand_path("2023_passing.csv", File.dirname(__FILE__))
    passing_data = CSV.read(passing_csv_path)
    passing_data.each do |pd|
        temp_hash = {
            year: 2023,
            completions: pd[2],
            attempts: pd[3],
            yards: pd[5],
            long: pd[7],
            touchdowns: pd[8],
            interceptions: pd[9],
            sacked: pd[10],
            rating: pd[11]
        }

        passing_hash[pd[0]] = temp_hash
    end

    rushing_csv_path = File.expand_path("2023_rushing.csv", File.dirname(__FILE__))
    rushing_data = CSV.read(rushing_csv_path)
    rushing_data.each do |rd|
        temp_hash = {
            year: 2023,
            attempts: rd[2],
            yards: rd[3],
            long: rd[5],
            touchdowns: rd[6]
        }

        rushing_hash[rd[0]] = temp_hash
    end

    receiving_csv_path = File.expand_path("2023_receiving.csv", File.dirname(__FILE__))
    receiving_data = CSV.read(receiving_csv_path)
    receiving_data.each do |rd|
        temp_hash = {
            year: 2023,
            receptions: rd[2],
            yards: rd[3],
            long: rd[5],
            touchdowns: rd[6]
        }

        receiving_hash[rd[0]] = temp_hash
    end

    defensive_csv_path = File.expand_path("2023_defensive.csv", File.dirname(__FILE__))
    defensive_data = CSV.read(defensive_csv_path)
    defensive_data.each do |dd|
        temp_hash = {
            year: 2023,
            solo: dd[2],
            assisted: dd[3],
            sacks: dd[5],
            sack_yards: dd[6],
            passes_deflected: dd[7],
            interceptions: dd[8],
            int_yards: dd[9],
            int_long: dd[10],
            touchdowns: dd[11],
            forced_fumbles: dd[12]
        }

        defensive_hash[dd[0]] = temp_hash
    end

    def positionNormalize(position)
        pos = position.upcase
        case pos
        when "OT"
            return "OL"
        when "DT"
            return "DL"
        when "C"
            return "OL"
        when "G"
            return "OL"
        when "CB"
            return "DB"
        else
            return pos
        end
    end

    players_csv_path = File.expand_path("2023_players.csv", File.dirname(__FILE__))
    player_data = CSV.read(players_csv_path, liberal_parsing: true)
    player_data.each do |pd|
        first, *last = pd[0].split(" ")
        feet, inches = pd[2].split(" ")
        player_hash = {
            first: first,
            last: last.join(" "),
            position: pd[1] == "--" ? nil : positionNormalize(pd[1]),
            height: pd[2] == "--" ? nil : feet[0].to_i*12 + inches[0].to_i,
            weight: pd[3] == "--" ? nil : pd[3].split(" ")[0].to_i,
            player_class: pd[4] == "--" ? nil : pd[4],
            college: pd[7] == "--" ? nil : pd[7],
            projected: -1
        }

        begin
            full_name = pd[0]
            player = Player.create!(player_hash)

            if passing_hash.include?(full_name)
                passing_hash[full_name][:player_id] = player.id
                Passing.create!(passing_hash[full_name])
            end

            if rushing_hash.include?(full_name)
                rushing_hash[full_name][:player_id] = player.id
                Rushing.create!(rushing_hash[full_name])
            end

            if receiving_hash.include?(full_name)
                receiving_hash[full_name][:player_id] = player.id
                Receiving.create!(receiving_hash[full_name])
            end

            if defensive_hash.include?(full_name)
                defensive_hash[full_name][:player_id] = player.id
                Defense.create!(defensive_hash[full_name])
            end
        rescue => e
            puts "error creating player: #{e.message}"
        end
    end

    # Update players with projections / 40 times
    projections_csv_path = File.expand_path("2024_projections.csv", File.dirname(__FILE__))
    projection_data = CSV.read(projections_csv_path, liberal_parsing: true)
    
    index=1
    projection_data.each do |pd|
        pd[3] = "UConn Huskies" if pd[3] == "Connecticut"

        # firstName, lastName, projection, college, forty
        found_player = Player.where(
            "(first ILIKE ? OR first ILIKE ?) AND last ILIKE ? AND college ILIKE ?",
            "%#{pd[0]}%", "%#{pd[0].gsub('.', '')}%", "%#{pd[1]}%", "%#{pd[3]}%"
          ).first

        begin
            if found_player
                found_player.update!({projected: index, forty_time: pd[4]})
                index += 1
            else
                puts "no player for #{pd[0]}, #{pd[1]}, #{pd[3]}"
            end
        rescue => e
            puts "error updating player: #{e.message}"
        end
    end
end