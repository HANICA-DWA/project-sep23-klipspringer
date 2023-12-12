import {Box, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function Terms() {
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
							Terms of Service for BKS
						</Typography>
						<Typography variant="h8">
							Last Updated: 12-12-2023
						</Typography>
					</Box>
					<Typography>
						Welcome to BKS ("we," "us," or "our"). By using our web application, you agree to comply with and be bound by the
						following Terms of Service ("Terms").
						Please review these Terms carefully.
					</Typography>
				</Box>
				<Box sx={{
					pb: "2rem",
				}}>
					<Typography variant="h6">
						1. Acceptance of Terms
					</Typography>
					<Typography>
						By accessing or using our web application, you acknowledge that you have read, understood, and
						agree to be bound by these Terms.
						If you do not agree to these Terms, please do not use our web application.
					</Typography>
				</Box>
				<Box sx={{
					pb: "2rem",
				}}>
					<Typography variant="h6">
						2. User Eligibility
					</Typography>
					<Typography>
						You must be at least 13 years old or have the legal capacity to enter into agreements to use our
						web application. By using our web application, you represent and warrant that you meet these
						eligibility requirements.
					</Typography>
				</Box>
				<Box sx={{
					pb: "2rem",
				}}>
					<Typography variant="h6">
						3. Account Registration
					</Typography>
					<Typography>
						To access certain features of our web application, you may be required to register for an
						account.
						You agree to provide accurate, current,
						and complete information during the registration process and to update such information to keep
						it accurate,
						current, and complete.
					</Typography>
				</Box>
				<Box sx={{
					pb: "2rem",
				}}>
					<Typography variant="h6">
						4. User Content
					</Typography>
					<Typography>
						You are solely responsible for the content you post or submit on our web application ("User
						Content").
						By posting User Content, you grant us a non-exclusive, transferable,
						sub-licensable, royalty-free, worldwide license to use, reproduce, modify, adapt, publish,
						distribute, and display such User Content.
					</Typography>
				</Box>
				<Box sx={{
					pb: "2rem",
				}}>
					<Typography variant="h6">
						5. Prohibited Conduct
					</Typography>
					<Typography>
						You agree not to engage in any of the following activities:

						Violating any applicable laws or regulations.
						Posting, transmitting, or disseminating content that is harmful, threatening, abusive,
						defamatory, or otherwise objectionable.
						Attempting to interfere with the proper functioning of our web application.
					</Typography>
				</Box>
				<Box sx={{
					pb: "2rem",
				}}>
					<Typography variant="h6">
						6. Intellectual Property
					</Typography>
					<Typography>
						Our web application and its original content, features, and functionality are owned by BKS and are protected by international copyright, trademark, patent, trade
						secret, and other intellectual property or proprietary rights laws.
					</Typography>
				</Box>
				<Box sx={{
					pb: "2rem",
				}}>
					<Typography variant="h6">
						7. Termination
					</Typography>
					<Typography>
						We reserve the right to terminate or suspend your account and access to our web application at
						our sole discretion, without notice, for any reason, including a breach of these Terms.
					</Typography>
				</Box>
				<Box sx={{
					pb: "2rem",
				}}>
					<Typography variant="h6">
						8. Limitation of Liability
					</Typography>
					<Typography>
						In no event shall BKS be liable for any indirect, incidental, special,
						consequential, or punitive damages arising out of or related to your use of our web application.
					</Typography>
				</Box>
				<Box sx={{
					pb: "2rem",
				}}>
					<Typography variant="h6">
						9. Changes to Terms
					</Typography>
					<Typography>
						We reserve the right to modify or replace these Terms at any time. It is your responsibility to
						check these Terms periodically for changes. Your continued use of our web application following
						the posting of any changes constitutes acceptance of those changes.
					</Typography>
				</Box>
				<Box sx={{
					pb: "2rem",
				}}>
					<Typography variant="h6">
						10. Contact Information
					</Typography>
					<Typography>
						If you have any questions about these Terms, please contact us at <Link
						to={"mailto:JJ.Schaafsma1@student.han.nl"}>JJ.Schaafsma1@student.han.nl</Link>.
					</Typography>
				</Box>
			</Stack>
		</>
	);
}