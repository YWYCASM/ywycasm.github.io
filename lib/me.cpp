#pragma GCC optimize(2)
#pragma GCC optimize(3)
#pragma GCC optimize("Ofast")
#include"test.h"
#include<iostream>
#include<cstdio>
#include<cstring>
#include<unordered_set>
using namespace std;
unordered_set<long long> st;
int main(){
	for(register int i=1;i<=50000000;i++){
		if(i%100000==0)cout<<i<<endl;st.insert(i);
	}
	return(0);	
}
