package com.example.bazar.payload;

public class ChangePasswordRequest {

    private Long id;
    private String newPassword;
    private String confirmPassword;

    public ChangePasswordRequest(Long id, String newPassword, String confirmPassword) {
        this.id = id;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
