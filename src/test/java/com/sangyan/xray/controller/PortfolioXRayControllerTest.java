package com.sangyan.xray.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class PortfolioXRayControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testDemoAnalysisWithoutFile() throws Exception {
        mockMvc.perform(post("/api/v1/xray/analyze"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.isDemo").value(true))
                .andExpect(jsonPath("$.totalFundsAnalyzed").exists());
    }

    @Test
    public void testValidPdfUpload() throws Exception {
        MockMultipartFile pdfFile = new MockMultipartFile(
                "file",
                "my_cas_statement.pdf",
                "application/pdf",
                "%PDF-1.4 test portfolio statement".getBytes()
        );

        mockMvc.perform(multipart("/api/v1/xray/analyze").file(pdfFile))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.isDemo").value(false))
                .andExpect(jsonPath("$.totalFundsAnalyzed").exists());
    }

    @Test
    public void testNonPdfFileUnsupportedMediaType() throws Exception {
        MockMultipartFile exeFile = new MockMultipartFile(
                "file",
                "malicious.exe",
                "application/octet-stream",
                "executable data".getBytes()
        );

        mockMvc.perform(multipart("/api/v1/xray/analyze").file(exeFile))
                .andExpect(status().isUnsupportedMediaType())
                .andExpect(jsonPath("$.status").value("ERROR"))
                .andExpect(jsonPath("$.message").value("Unsupported file format. Only CAMS/KFintech CAS PDFs and PNG/JPG screenshots are supported."));
    }

    @Test
    public void testOversizedFileUpload() throws Exception {
        byte[] largeBytes = new byte[11 * 1024 * 1024]; // 11MB
        MockMultipartFile largeFile = new MockMultipartFile(
                "file",
                "large_statement.pdf",
                "application/pdf",
                largeBytes
        );

        mockMvc.perform(multipart("/api/v1/xray/analyze").file(largeFile))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("ERROR"))
                .andExpect(jsonPath("$.message").value("File size exceeds maximum allowed limit of 10MB."));
    }
}
