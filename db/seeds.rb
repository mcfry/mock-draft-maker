# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

require 'csv'

teams_csv_path = File.expand_path("teams.csv", File.dirname(__FILE__))
teams_data = CSV.read(teams_csv_path)
teams_data.each do |td|
    city, name = td[1].split(" ")
    if city == "Las" or city == "Los" or city == "New" or city == "San"
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

draft_csv_path = File.expand_path("2023_draft.csv", File.dirname(__FILE__))
draft_data = CSV.read(draft_csv_path)
draft_data.each do |td|
    first, *last = td[3].split(" ")
    player_hash = {
        first: first,
        last: last.join(" "),
        number: td[5],
        position: td[4],
        college: td[27]
    }

    begin
        puts Player.create!(player_hash)
    rescue => e
        puts "error: #{e.message}"
    end
end