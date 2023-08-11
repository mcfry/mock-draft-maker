class CreateReceivings < ActiveRecord::Migration[7.0]
  def change
    create_table :receivings, id: :uuid do |t|
      t.belongs_to :player, index: true, foreign_key: true
      t.integer :year
      # t.integer :games_played
      t.integer :receptions
      t.integer :yards
      t.integer :long
      t.integer :touchdowns

      t.timestamps
    end
  end
end
