class CreateDefenses < ActiveRecord::Migration[7.0]
  def change
    create_table :defenses, id: :uuid do |t|
      t.belongs_to :player, index: true, foreign_key: true
      t.integer :year
      t.integer :solo
      t.integer :assisted
      t.float :sacks
      t.integer :sack_yards
      t.integer :passes_deflected
      t.integer :interceptions
      t.integer :int_yards
      t.integer :int_long
      t.integer :touchdowns
      t.integer :forced_fumbles

      t.timestamps
    end
  end
end
