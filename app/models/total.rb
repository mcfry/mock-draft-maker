class Total
    attr_accessor :player, :passing, :rushing, :receiving
    attr_accessor :total_plays, :total_yards, :yards_per_play, :total_touchdowns
  
    def initialize(player, passing, rushing, receiving)
      @player = player
      @passing = passing
      @rushing = rushing
      @receiving = receiving
    end

    def total_plays
        passing_plays + rushing_plays + receiving_plays
    end
  
    def total_yards
        passing_yards + rushing_yards + receiving_yards
    end

    def yards_per_play
        if total_plays > 0
            total_yards.to_f / total_plays.to_f
        else
            0
        end
    end

    def total_touchdowns
        passing_touchdowns + rushing_touchdowns + receiving_touchdowns
    end
  
    private

        def passing_plays
            passing&.attempts || 0
        end

        def rushing_plays
            rushing&.attempts || 0
        end

        def receiving_plays
            receiving&.receptions || 0
        end
    
        def passing_yards
            passing&.yards || 0
        end
    
        def rushing_yards
            rushing&.yards || 0
        end

        def receiving_yards
            receiving&.yards || 0
        end

        def passing_touchdowns
            passing&.touchdowns || 0
        end
    
        def rushing_touchdowns
            rushing&.touchdowns || 0
        end

        def receiving_touchdowns
            receiving&.touchdowns || 0
        end
end