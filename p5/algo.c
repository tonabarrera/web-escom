#include<stdio.h>
#include<stdlib.h>
#include<uistd.h>
int main(void) {
  int proc;
  for (int x = 0; x < 4; x++) {
    proc=fork();
    if(x==0 && proc==0){
      printf("soy el mapa");
      proc=fork();
      if(proc==0){
        for (int x = 0; x < 3; x++) {
          proc=fork();
          if(x==0 && proc==0){
            proc=fork();
            if(proc==0){
              proc=fork();
              if(proc==0){
                proc=fork();
                for (int x = 0; x < 2; x++) {
                  proc=fork();
                  if(x==0 && proc==0){
                    printf("soy el mapa\n");
                    exit(0);
                  }
                  else if(x==1 && proc==0){
                    printf("soy el mapa\n");
                    exit(0);
                  }
                  else{

                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return 0;
}
