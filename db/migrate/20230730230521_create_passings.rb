class CreatePassings < ActiveRecord::Migration[7.0]
  def change
    create_table :passings, id: false do |t|
      t.belongs_to :player, index: true, foreign_key: true
      t.uuid :id, primary_key: true
      t.integer :year
      t.integer :games_played
      t.integer :attempts
      t.integer :completions
      t.integer :yards
      t.integer :touchdowns
      t.integer :interceptions
      t.integer :rating

      t.timestamps
    end
  end
end
