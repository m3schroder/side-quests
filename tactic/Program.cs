using System.ComponentModel;
using System.Diagnostics.Contracts;
using System.Security;

class Program
{
    static void Main(string[] args)
    {
        var board = new Board();
        string msg = "";
        while(board.winner == null){
            Console.Clear();
            Console.WriteLine(msg);
            msg = "";
            Console.WriteLine(board);
            Console.Write("Enter a number between 1-9: ");
            var idx = Console.ReadLine();
            int place;
            if(Int32.TryParse(idx, out place)){
                if(place < 1 || place > 9){
                    msg = "Please enter a number between 1-9";
                    continue;
                }
                board.Move(Int32.Parse(idx));
            }
            else
                Console.WriteLine("Please enter a number");
        }

        Console.WriteLine($"Player {board.winner} won the game!");
    }
}

class Board 
{
    string player = "X";
    public string? winner = null;
    string[] state = { " ", " ", " ", " ", " ", " ", " ", " ", " " };

    // The indicies of win conditions on the board state
    public int[][] wins = {
        new int[]{0,1,2},
        new int[]{3,4,5},
        new int[]{6,7,8},
        new int[]{0,3,6},
        new int[]{1,4,7},
        new int[]{2,5,8},
        new int[]{0,4,8},
        new int[]{2,4,6}
    };
    public bool Won(string player)
    {
        foreach(var row in wins){
            if( state[row[0]] == player && state[row[1]] == player && state[row[2]] == player )
            {
                winner = player;
                return true;
            }
        }
        return false;
    }

    public bool Move(int idx)
    {
        state[idx-1] = player;
        if(Won(player))
            return true;
        else{
            player = player == "X" ? "O" : "X";
            return false;
        }
    }

    public override string ToString()
    {
        var playerMsg = $"\t--- Player {player} ---\n";
        var board = string.Format(@"
    {0} | {1} | {2}          1 | 2 | 3
   ---|---|---        ---|---|---
    {3} | {4} | {5}          4 | 5 | 6
   ---|---|---        ---|---|---
    {6} | {7} | {8}          7 | 8 | 9
           ", this.state);

        return  playerMsg + board;
    }
}
