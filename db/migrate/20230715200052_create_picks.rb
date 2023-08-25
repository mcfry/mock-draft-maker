class CreatePicks < ActiveRecord::Migration[7.0]
  def change
    create_table :picks do |t|
      t.belongs_to :player, index: true, foreign_key: true
      t.belongs_to :draft_record_team, type: :uuid, index: true, foreign_key: true
      t.integer :pick_number, null: false

      t.timestamps
    end
  end
end
