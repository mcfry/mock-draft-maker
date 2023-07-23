class CreatePicks < ActiveRecord::Migration[7.0]
  def change
    create_table :picks do |t|
      t.belongs_to :team, index: true, foreign_key: true
      t.belongs_to :player, index: true, foreign_key: true
      t.integer :year, null: false
      t.integer :round, null: false
      t.integer :pick_number, null: false
      t.string :from, default: "Original"

      t.timestamps
    end
  end
end
