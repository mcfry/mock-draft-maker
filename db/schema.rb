# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_11_151625) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "defenses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "player_id"
    t.integer "year"
    t.integer "solo"
    t.integer "assisted"
    t.float "sacks"
    t.integer "sack_yards"
    t.integer "passes_deflected"
    t.integer "interceptions"
    t.integer "int_yards"
    t.integer "int_long"
    t.integer "touchdowns"
    t.integer "forced_fumbles"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_defenses_on_player_id"
  end

  create_table "draft_record_teams", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "draft_record_id"
    t.uuid "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["draft_record_id"], name: "index_draft_record_teams_on_draft_record_id"
    t.index ["team_id"], name: "index_draft_record_teams_on_team_id"
  end

  create_table "draft_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "year"
    t.integer "speed"
    t.integer "needs_vs_value"
    t.integer "randomness"
    t.string "value_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "passings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "player_id"
    t.integer "year"
    t.integer "attempts"
    t.integer "completions"
    t.integer "long"
    t.integer "yards"
    t.integer "touchdowns"
    t.integer "interceptions"
    t.integer "sacked"
    t.integer "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_passings_on_player_id"
  end

  create_table "picks", force: :cascade do |t|
    t.bigint "player_id"
    t.uuid "draft_record_team_id"
    t.integer "pick_number", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["draft_record_team_id"], name: "index_picks_on_draft_record_team_id"
    t.index ["player_id"], name: "index_picks_on_player_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "first", null: false
    t.string "last", null: false
    t.string "position", null: false
    t.integer "height"
    t.integer "weight"
    t.string "player_class"
    t.string "college"
    t.integer "projected", null: false
    t.float "forty_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "receivings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "player_id"
    t.integer "year"
    t.integer "receptions"
    t.integer "yards"
    t.integer "long"
    t.integer "touchdowns"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_receivings_on_player_id"
  end

  create_table "rushings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "player_id"
    t.integer "year"
    t.integer "attempts"
    t.integer "yards"
    t.integer "long"
    t.integer "touchdowns"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_rushings_on_player_id"
  end

  create_table "teams", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "city", null: false
    t.string "abbreviation", null: false
    t.string "conference", null: false
    t.string "division", null: false
    t.string "icon", default: "https://d15mgyxo4zj1px.cloudfront.net/uploads/thumb_340e912d-2449-4bf4-98b7-8844908bb64d.png"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "defenses", "players"
  add_foreign_key "draft_record_teams", "draft_records"
  add_foreign_key "draft_record_teams", "teams"
  add_foreign_key "passings", "players"
  add_foreign_key "picks", "draft_record_teams"
  add_foreign_key "picks", "players"
  add_foreign_key "receivings", "players"
  add_foreign_key "rushings", "players"
end
