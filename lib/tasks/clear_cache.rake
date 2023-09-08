namespace :custom do
    desc 'Clear the cache'
    task clear_cache: :environment do
        Rails.cache.clear
        puts "Cleared the cache"
    end
end