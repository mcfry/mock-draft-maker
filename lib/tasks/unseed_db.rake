namespace :custom do
    desc 'Delete all seeded data'
    task unseed_db: :environment do
        Team.destroy_all
        Player.destroy_all
        puts "Deleted Seeds"
    end
end