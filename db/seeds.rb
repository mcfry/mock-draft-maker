# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

require 'csv'
require 'securerandom'

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

    passing_csv_path = File.expand_path("2023_passing.csv", File.dirname(__FILE__))
    passing_data = CSV.read(passing_csv_path)
    passing_data[3..-1].each do |pd|
        temp_hash = {
            id: SecureRandom.uuid,
            year: 2023,
            games_played: pd[4],
            attempts: pd[6],
            completions: pd[5],
            yards: pd[8],
            touchdowns: pd[11],
            interceptions: pd[12],
            rating: pd[13]
        }

        name = pd[1][-1] == "*" ? pd[1][0..-2] : pd[1]
        passing_hash[name] = temp_hash
        # could be only record, so complete it
        if pd[14].to_i > 0
            rushing_hash[name] = {}
            rushing_hash[name][:id] = SecureRandom.uuid
            rushing_hash[name][:year] = 2023
            rushing_hash[name][:games_played] = pd[4]
            rushing_hash[name][:attempts] = pd[14]
            rushing_hash[name][:yards] = pd[15]
            rushing_hash[name][:touchdowns] = pd[17]
        end
    end

    rushing_csv_path = File.expand_path("2023_rushing.csv", File.dirname(__FILE__))
    rushing_data = CSV.read(rushing_csv_path)
    rushing_data[2..-1].each do |rd|
        temp_hash = {
            id: SecureRandom.uuid,
            year: 2023,
            games_played: rd[4],
            attempts: rd[5],
            yards: rd[6],
            touchdowns: rd[8]
        }

        name = rd[1][-1] == "*" ? rd[1][0..-2] : rd[1]
        rushing_hash[name] = temp_hash # overwrite if exists
        # could be only record, so complete it
        if rd[9].to_i > 0
            receiving_hash[name] = {}
            receiving_hash[name][:id] = SecureRandom.uuid
            receiving_hash[name][:year] = 2023
            receiving_hash[name][:games_played] = rd[4]
            receiving_hash[name][:receptions] = rd[9]
            receiving_hash[name][:yards] = rd[10]
            receiving_hash[name][:touchdowns] = rd[12]
        end
    end

    receiving_csv_path = File.expand_path("2023_receiving.csv", File.dirname(__FILE__))
    receiving_data = CSV.read(receiving_csv_path)
    receiving_data[2..-1].each do |rd|
        temp_hash = {
            id: SecureRandom.uuid,
            year: 2023,
            games_played: rd[4],
            receptions: rd[5],
            yards: rd[6],
            touchdowns: rd[8]
        }

        name = rd[1][-1] == "*" ? rd[1][0..-2] : rd[1]
        receiving_hash[name] = temp_hash # overwrite if exists
        # could be only record, so complete it
        if rd[9].to_i > 0
            rushing_hash[name] = {}
            rushing_hash[name][:id] = SecureRandom.uuid
            rushing_hash[name][:year] = 2023
            rushing_hash[name][:games_played] = rd[4]
            rushing_hash[name][:attempts] = rd[9]
            rushing_hash[name][:yards] = rd[10]
            rushing_hash[name][:touchdowns] = rd[12]
        end
    end

    draft_csv_path = File.expand_path("2023_draft.csv", File.dirname(__FILE__))
    draft_data = CSV.read(draft_csv_path)
    draft_data.each do |td|
        first, *last = td[3].split(" ")
        player_hash = {
            first: first,
            last: last.join(" "),
            number: td[5],
            position: td[4],
            college: td[27],
            projected: td[1]
        }

        begin
            full_name = [first, last].join(" ")
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
        rescue => e
            puts "error: #{e.message}"
        end
    end
end