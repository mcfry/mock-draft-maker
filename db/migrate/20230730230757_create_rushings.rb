class CreateRushings < ActiveRecord::Migration[7.0]
  def change
    create_table :rushings, id: :uuid do |t|
      t.belongs_to :player, index: true, foreign_key: true
      t.integer :year
      t.integer :attempts
      t.integer :yards
      t.integer :long
      t.integer :touchdowns

      t.timestamps
    end
  end
end
