#include <iostream>
#include <windows.h>
#include <algorithm> // Pour std::transform
#include <cctype>    // Pour std::toupper
#include <string> 
#include <filesystem>

using namespace std;
namespace fs = std::filesystem;

static string function_Start_obsolute(string programme)
{   
    string command = "start " + programme;
     
    int reussi = system(command.c_str());
    if (reussi == 0)
    {
        return "true";
    }
    else
    {
        return "false";
    }
}

static string function_Start_relative(string programme, string chemin)
{   
    if (chemin == "C:/")
    {
        return "false";
    }
    
    string command = "start " + chemin + "/" + programme;
     
    int reussi = system(command.c_str());
    if (reussi == 0)
    {
        return "true";
    }
    else
    {
        return "false";
    }
}

int main(int argc, char * argv[])
{
    string str = argv[1];
    std::transform(str.begin(), str.end(), str.begin(),[](unsigned char c) { return std::toupper(c); });


    if (str == "START")
    {
        fs::path cheminRelatif = argv[2];

        if (cheminRelatif.is_relative())
        {
            string retour = function_Start_relative(argv[2], argv[3]);
            std::cout << retour;
        }
        else if (cheminRelatif.is_absolute())
        {
            string retour = function_Start_obsolute(argv[2]);
            std::cout << retour;
        }
        return 0;
    }    
}
