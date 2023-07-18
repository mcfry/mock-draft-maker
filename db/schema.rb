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

ActiveRecord::Schema[7.0].define(version: 202307152000522) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "picks", force: :cascade do |t|
    t.bigint "team_id"
    t.bigint "player_id"
    t.integer "year", null: false
    t.integer "round", null: false
    t.integer "pick_number", null: false
    t.string "from", default: "Original"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_picks_on_player_id"
    t.index ["team_id"], name: "index_picks_on_team_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "first", null: false
    t.string "last", null: false
    t.integer "number"
    t.string "position", null: false
    t.string "college"
    t.integer "projected", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string "name", null: false
    t.string "city", null: false
    t.string "abbreviation", null: false
    t.string "conference", null: false
    t.string "division", null: false
    t.string "icon", default: "https://d15mgyxo4zj1px.cloudfront.net/uploads/thumb_340e912d-2449-4bf4-98b7-8844908bb64d.png"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "picks", "players"
  add_foreign_key "picks", "teams"
end
