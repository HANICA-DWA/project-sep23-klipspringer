import {Box, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function Privacy() {
    return (
        <>
            <Stack sx={{
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                maxWidth: "800px",
            }}>
                <Box sx={{
                    pb: "1rem",
                }}>
                    <Box sx={{
                        pb: "2rem",
                    }}>
                        <Typography variant="h2">
                            Privacy Policy for BKS
                        </Typography>
                        <Typography variant="h8">
                            Last Updated: 12-12-2023
                        </Typography>
                    </Box>
                    <Typography>
                        Welcome to BKS ("we," "us," or "our").
                        This Privacy Policy explains how we collect, use, disclose, and protect your personal information.
                        By using our web application, you agree to the terms outlined in this Privacy Policy.
                    </Typography>
                </Box>
                <Box sx={{
                    pb: "2rem",
                }}>
                    <Typography variant="h6">
                        1. Information We Collect
                    </Typography>
                    <Typography>
                        <strong>1.1 Personal Information</strong><br />
                        We may collect personal information that you voluntarily provide when using our web application.
                        This may include, but is not limited to, your name, email address,
                        and any other information you choose to provide.
                    </Typography>
                    <Typography>
                        <strong>1.2 Usage Information</strong><br />
                        We may collect non-personal information about how you interact with our web application,
                        such as your IP address, browser type, and the pages you visit.
                    </Typography>
                </Box>
                <Box sx={{
                    pb: "2rem",
                }}>
                    <Typography variant="h6">
                        2. How We Use Your Information
                    </Typography>
                    <Typography>
                        We may use the information we collect for the following purposes:

                        To provide and maintain our web application.
                        To personalize your experience.
                        To improve our web application.
                        To send periodic emails regarding your account or other products and services.
                    </Typography>
                </Box>
                <Box sx={{
                    pb: "2rem",
                }}>
                    <Typography variant="h6">
                        3. Cookies and Similar Technologies
                    </Typography>
                    <Typography>
                        We may use cookies and similar technologies to collect information and improve your experience on our web application.
                        You can control the use of cookies through your browser settings.
                    </Typography>
                </Box>
                <Box sx={{
                    pb: "2rem",
                }}>
                    <Typography variant="h6">
                        4. Third-Party Disclosure
                    </Typography>
                    <Typography>
                        We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
                        except as set forth in this Privacy Policy.
                    </Typography>
                </Box>
                <Box sx={{
                    pb: "2rem",
                }}>
                    <Typography variant="h6">
                        5. Data Security
                    </Typography>
                    <Typography>
                        We implement reasonable security measures to protect your personal information from unauthorized access,
                        disclosure, alteration, and destruction.
                    </Typography>
                </Box>
                <Box sx={{
                    pb: "2rem",
                }}>
                    <Typography variant="h6">
                        6. Links to Third-Party Websites
                    </Typography>
                    <Typography>
                        Our web application may contain links to third-party websites.
                        We are not responsible for the privacy practices or the content of these third-party sites.
                    </Typography>
                </Box>
                <Box sx={{
                    pb: "2rem",
                }}>
                    <Typography variant="h6">
                        7. Children's Privacy
                    </Typography>
                    <Typography>
                        Our web application is not intended for individuals under the age of 13.
                        We do not knowingly collect personal information from children.
                    </Typography>
                </Box>
                <Box sx={{
                    pb: "2rem",
                }}>
                    <Typography variant="h6">
                        8. Changes to Privacy Policy
                    </Typography>
                    <Typography>
                        We reserve the right to update or modify this Privacy Policy at any time.
                        The date of the last update will be indicated at the top of this Privacy Policy.
                    </Typography>
                </Box>
                <Box sx={{
                    pb: "2rem",
                }}>
                    <Typography variant="h6">
                        9. Contact Information
                    </Typography>
                    <Typography>
                        If you have any questions about this Privacy Policy, please contact us at <Link
                        to={"mailto:JJ.Schaafsma1@student.han.nl"}>JJ.Schaafsma1@student.han.nl</Link>.
                    </Typography>
                </Box>
            </Stack>
        </>
    );
}