package com.example.bazar.enumeration;

public enum ItemSort {
    DATE("dateAdded"),
    ALPHABETICAL("name"),
    PRICE("price");

    String variableName;

    ItemSort(String variableName){
        this.variableName = variableName;
    }

    @Override
    public String toString(){
        return variableName;
    }
}
